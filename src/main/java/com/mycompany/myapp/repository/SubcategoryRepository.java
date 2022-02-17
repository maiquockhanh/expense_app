package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Subcategory;
import java.util.Set;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Subcategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubcategoryRepository extends JpaRepository<Subcategory, Long> {
    @Query("SELECT s FROM Subcategory s WHERE s.category.id = ?1")
    Set<Subcategory> findSubByCategoryId(Long categoryId);
}
