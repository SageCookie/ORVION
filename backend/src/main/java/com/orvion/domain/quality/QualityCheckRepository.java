package com.orvion.domain.quality;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QualityCheckRepository extends JpaRepository<QualityCheck, Long> {}
