package com.orvion.common.util;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.orvion.domain.quotation.Quotation;
import com.orvion.domain.quotation.QuotationItem;
import com.orvion.domain.invoice.Invoice;
import com.orvion.domain.invoice.InvoiceItem;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.awt.Color;

@Service
public class PdfGeneratorUtil {

    public static byte[] generateQuotationPdf(Quotation quotation) {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document(PageSize.A4, 36, 36, 36, 36);
            PdfWriter.getInstance(document, out);
            document.open();

            // Header Banner
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 22, Color.DARK_GRAY);
            Paragraph title = new Paragraph("ORVION BUSINESS OPERATIONS", titleFont);
            title.setAlignment(Element.ALIGN_LEFT);
            document.add(title);

            Font subTitleFont = FontFactory.getFont(FontFactory.HELVETICA, 12, Color.GRAY);
            Paragraph subtitle = new Paragraph("COMMERCIAL QUOTATION #" + quotation.getQuotationNumber(), subTitleFont);
            subtitle.setAlignment(Element.ALIGN_LEFT);
            document.add(subtitle);

            document.add(new Paragraph("\n"));

            // Customer Info Table
            PdfPTable infoTable = new PdfPTable(2);
            infoTable.setWidthPercentage(100);

            Font boldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10);
            Font normFont = FontFactory.getFont(FontFactory.HELVETICA, 10);

            PdfPCell c1 = new PdfPCell(new Phrase("CUSTOMER DETAILS\n" +
                    quotation.getCustomer().getCompanyName() + "\n" +
                    "Contact: " + quotation.getCustomer().getContactName() + "\n" +
                    "Email: " + quotation.getCustomer().getEmail() + "\n" +
                    "Phone: " + quotation.getCustomer().getPhone(), normFont));
            c1.setBorder(Rectangle.NO_BORDER);

            PdfPCell c2 = new PdfPCell(new Phrase("QUOTATION DETAILS\n" +
                    "Quote Date: " + quotation.getIssueDate() + "\n" +
                    "Valid Until: " + quotation.getValidUntil() + "\n" +
                    "Status: " + quotation.getStatus() + "\n" +
                    "Tax ID: " + (quotation.getCustomer().getTaxId() != null ? quotation.getCustomer().getTaxId() : "N/A"), normFont));
            c2.setBorder(Rectangle.NO_BORDER);

            infoTable.addCell(c1);
            infoTable.addCell(c2);
            document.add(infoTable);

            document.add(new Paragraph("\n\n"));

            // Items Table
            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100);
            table.setWidths(new float[]{1, 3, 1, 1.5f, 2});

            String[] headers = {"#", "Product / Description", "Qty", "Unit Price", "Total ($)"};
            for (String h : headers) {
                PdfPCell cell = new PdfPCell(new Phrase(h, boldFont));
                cell.setBackgroundColor(new Color(240, 240, 240));
                cell.setPadding(6);
                table.addCell(cell);
            }

            int idx = 1;
            for (QuotationItem item : quotation.getItems()) {
                table.addCell(new Phrase(String.valueOf(idx++), normFont));
                table.addCell(new Phrase(item.getProduct().getName(), normFont));
                table.addCell(new Phrase(String.valueOf(item.getQuantity()), normFont));
                table.addCell(new Phrase("$" + item.getUnitPrice(), normFont));
                table.addCell(new Phrase("$" + item.getLineTotal(), normFont));
            }

            document.add(table);

            document.add(new Paragraph("\n"));

            // Summary Math
            Paragraph summary = new Paragraph(
                    "Subtotal: $" + quotation.getSubtotal() + "\n" +
                    "Tax (18%): $" + quotation.getTaxAmount() + "\n" +
                    "Grand Total: $" + quotation.getGrandTotal(), boldFont);
            summary.setAlignment(Element.ALIGN_RIGHT);
            document.add(summary);

            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error generating Quotation PDF", e);
        }
    }

    public static byte[] generateInvoicePdf(Invoice invoice) {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document(PageSize.A4, 36, 36, 36, 36);
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 22, Color.DARK_GRAY);
            Paragraph title = new Paragraph("ORVION BUSINESS OPERATIONS", titleFont);
            document.add(title);

            Font subTitleFont = FontFactory.getFont(FontFactory.HELVETICA, 12, Color.GRAY);
            Paragraph subtitle = new Paragraph("TAX INVOICE #" + invoice.getInvoiceNumber(), subTitleFont);
            document.add(subtitle);

            document.add(new Paragraph("\n"));

            PdfPTable infoTable = new PdfPTable(2);
            infoTable.setWidthPercentage(100);

            Font normFont = FontFactory.getFont(FontFactory.HELVETICA, 10);
            Font boldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10);

            PdfPCell c1 = new PdfPCell(new Phrase("BILLED TO\n" +
                    invoice.getCustomer().getCompanyName() + "\n" +
                    "Contact: " + invoice.getCustomer().getContactName() + "\n" +
                    "Email: " + invoice.getCustomer().getEmail(), normFont));
            c1.setBorder(Rectangle.NO_BORDER);

            PdfPCell c2 = new PdfPCell(new Phrase("INVOICE DETAILS\n" +
                    "Issue Date: " + invoice.getIssueDate() + "\n" +
                    "Due Date: " + invoice.getDueDate() + "\n" +
                    "Status: " + invoice.getStatus() + "\n" +
                    "Balance Due: $" + invoice.getBalanceDue(), normFont));
            c2.setBorder(Rectangle.NO_BORDER);

            infoTable.addCell(c1);
            infoTable.addCell(c2);
            document.add(infoTable);

            document.add(new Paragraph("\n\n"));

            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100);
            table.setWidths(new float[]{1, 3, 1, 1.5f, 2});

            String[] headers = {"#", "Item Description", "Qty", "Unit Price", "Line Total ($)"};
            for (String h : headers) {
                PdfPCell cell = new PdfPCell(new Phrase(h, boldFont));
                cell.setBackgroundColor(new Color(240, 240, 240));
                cell.setPadding(6);
                table.addCell(cell);
            }

            int idx = 1;
            for (InvoiceItem item : invoice.getItems()) {
                table.addCell(new Phrase(String.valueOf(idx++), normFont));
                table.addCell(new Phrase(item.getProduct().getName(), normFont));
                table.addCell(new Phrase(String.valueOf(item.getQuantity()), normFont));
                table.addCell(new Phrase("$" + item.getUnitPrice(), normFont));
                table.addCell(new Phrase("$" + item.getLineTotal(), normFont));
            }

            document.add(table);

            document.add(new Paragraph("\n"));

            Paragraph summary = new Paragraph(
                    "Subtotal: $" + invoice.getSubtotal() + "\n" +
                    "Tax Amount: $" + invoice.getTaxAmount() + "\n" +
                    "Grand Total: $" + invoice.getGrandTotal() + "\n" +
                    "Paid Amount: $" + invoice.getPaidAmount() + "\n" +
                    "Balance Due: $" + invoice.getBalanceDue(), boldFont);
            summary.setAlignment(Element.ALIGN_RIGHT);
            document.add(summary);

            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error generating Invoice PDF", e);
        }
    }
}
