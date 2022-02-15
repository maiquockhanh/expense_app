package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Expense;
import com.mycompany.myapp.repository.ExpenseRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Expense}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ExpenseResource {

    private final Logger log = LoggerFactory.getLogger(ExpenseResource.class);

    private static final String ENTITY_NAME = "expense";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExpenseRepository expenseRepository;

    public ExpenseResource(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    /**
     * {@code POST  /expenses} : Create a new expense.
     *
     * @param expense the expense to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new expense, or with status {@code 400 (Bad Request)} if the expense has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/expenses")
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense) throws URISyntaxException {
        log.debug("REST request to save Expense : {}", expense);
        if (expense.getId() != null) {
            throw new BadRequestAlertException("A new expense cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Expense result = expenseRepository.save(expense);
        return ResponseEntity
            .created(new URI("/api/expenses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /expenses/:id} : Updates an existing expense.
     *
     * @param id the id of the expense to save.
     * @param expense the expense to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated expense,
     * or with status {@code 400 (Bad Request)} if the expense is not valid,
     * or with status {@code 500 (Internal Server Error)} if the expense couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/expenses/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable(value = "id", required = false) final Long id, @RequestBody Expense expense)
        throws URISyntaxException {
        log.debug("REST request to update Expense : {}, {}", id, expense);
        if (expense.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, expense.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!expenseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Expense result = expenseRepository.save(expense);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, expense.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /expenses/:id} : Partial updates given fields of an existing expense, field will ignore if it is null
     *
     * @param id the id of the expense to save.
     * @param expense the expense to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated expense,
     * or with status {@code 400 (Bad Request)} if the expense is not valid,
     * or with status {@code 404 (Not Found)} if the expense is not found,
     * or with status {@code 500 (Internal Server Error)} if the expense couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/expenses/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Expense> partialUpdateExpense(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Expense expense
    ) throws URISyntaxException {
        log.debug("REST request to partial update Expense partially : {}, {}", id, expense);
        if (expense.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, expense.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!expenseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Expense> result = expenseRepository
            .findById(expense.getId())
            .map(existingExpense -> {
                if (expense.getDate() != null) {
                    existingExpense.setDate(expense.getDate());
                }
                if (expense.getMerchant() != null) {
                    existingExpense.setMerchant(expense.getMerchant());
                }
                if (expense.getAmount() != null) {
                    existingExpense.setAmount(expense.getAmount());
                }
                if (expense.getStatus() != null) {
                    existingExpense.setStatus(expense.getStatus());
                }
                if (expense.getPaymentMethod() != null) {
                    existingExpense.setPaymentMethod(expense.getPaymentMethod());
                }
                if (expense.getRefNo() != null) {
                    existingExpense.setRefNo(expense.getRefNo());
                }
                if (expense.getImage() != null) {
                    existingExpense.setImage(expense.getImage());
                }
                if (expense.getImageContentType() != null) {
                    existingExpense.setImageContentType(expense.getImageContentType());
                }

                return existingExpense;
            })
            .map(expenseRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, expense.getId().toString())
        );
    }

    /**
     * {@code GET  /expenses} : get all the expenses.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of expenses in body.
     */
    @GetMapping("/expenses")
    public List<Expense> getAllExpenses() {
        log.debug("REST request to get all Expenses");
        return expenseRepository.findAll();
    }

    /**
     * {@code GET  /expenses/company/{companyId}} : get all the expenses by company.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of expenses in body.
     */
    @GetMapping("/expenses/company/{companyId}")
    public List<Expense> getExpensesByCompany(@PathVariable Long companyId) {
        log.debug("REST request to get all Expenses", companyId);
        List<Expense> expenses = expenseRepository.findAllExpenses(companyId);
        return expenses;
    }

    /**
     * {@code GET  /expenses/:id} : get the "id" expense.
     *
     * @param id the id of the expense to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the expense, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/expenses/{id}")
    public ResponseEntity<Expense> getExpense(@PathVariable Long id) {
        log.debug("REST request to get Expense : {}", id);
        Optional<Expense> expense = expenseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(expense);
    }

    /**
     * {@code DELETE  /expenses/:id} : delete the "id" expense.
     *
     * @param id the id of the expense to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/expenses/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        log.debug("REST request to delete Expense : {}", id);
        expenseRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
