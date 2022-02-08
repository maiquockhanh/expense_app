package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Subcategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Subcategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubcategoryRepository extends JpaRepository<Subcategory, Long> {}
