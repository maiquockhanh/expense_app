package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Expense;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Expense entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    @Query("SELECT e FROM Expense e WHERE e.company.id = ?1")
    List<Expense> findAllExpenses(Long companyId);
}
