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
    List<Expense> findAllExpensesByCompany(Long companyId);

    @Query("SELECT e FROM Expense e WHERE e.applicationUser.id = ?1")
    List<Expense> findAllExpensesByUser(Long userId);

    @Query("SELECT e FROM Expense e where e.applicationUser.id IN (SELECT u.id FROM ApplicationUser u WHERE u.approver.id = ?1)")
    List<Expense> findAllExpensesByApprover(Long approverId);
}
