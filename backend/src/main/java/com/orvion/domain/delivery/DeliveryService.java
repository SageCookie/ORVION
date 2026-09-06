package com.orvion.domain.delivery;

import com.orvion.common.exception.ResourceNotFoundException;
import com.orvion.domain.order.Order;
import com.orvion.domain.order.OrderRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class DeliveryService {
    private final DeliveryRepository deliveryRepository;
    private final OrderRepository orderRepository;

    public DeliveryService(DeliveryRepository deliveryRepository, OrderRepository orderRepository) {
        this.deliveryRepository = deliveryRepository;
        this.orderRepository = orderRepository;
    }

    @Transactional(readOnly = true)
    public Page<Delivery> getDeliveries(String query, int page, int size) {
        return deliveryRepository.searchDeliveries(query, PageRequest.of(page, size, Sort.by("id").descending()));
    }

    @Transactional(readOnly = true)
    public Delivery getById(Long id) {
        return deliveryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery not found with id: " + id));
    }

    @Transactional
    public Delivery createDelivery(DeliveryCreateRequest req) {
        Order order = orderRepository.findById(req.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        String address = req.getDeliveryAddress() != null && !req.getDeliveryAddress().isBlank()
                ? req.getDeliveryAddress()
                : order.getCustomer().getAddressLine1() + ", " + order.getCustomer().getCity();

        Delivery delivery = Delivery.builder()
                .deliveryNumber("DEL-" + System.currentTimeMillis() % 100000)
                .order(order)
                .assignedDriverName(req.getAssignedDriverName() != null ? req.getAssignedDriverName() : "Logistics Fleet")
                .deliveryAddress(address)
                .status("PLANNED")
                .trackingNumber("TRK-" + System.currentTimeMillis() % 1000000)
                .notes(req.getNotes())
                .build();

        return deliveryRepository.save(delivery);
    }

    @Transactional
    public Delivery updateStatus(Long id, String status) {
        Delivery delivery = getById(id);
        delivery.setStatus(status.toUpperCase());
        if ("DISPATCHED".equalsIgnoreCase(status)) {
            delivery.setDispatchDate(LocalDate.now());
        } else if ("DELIVERED".equalsIgnoreCase(status)) {
            delivery.setDeliveredDate(LocalDate.now());
            delivery.getOrder().setStatus("COMPLETED");
            orderRepository.save(delivery.getOrder());
        }
        return deliveryRepository.save(delivery);
    }
}
