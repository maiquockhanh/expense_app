package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.Role;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ApplicationUser.
 */
@Entity
@Table(name = "application_user")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ApplicationUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @OneToOne
    @JoinColumn(unique = true)
    private User internalUser;

    @OneToMany(mappedBy = "applicationUser")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "category", "company", "applicationUser" }, allowSetters = true)
    private Set<Expense> expenses = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "internalUser", "expenses", "approver", "company" }, allowSetters = true)
    private ApplicationUser approver;

    @ManyToOne
    @JsonIgnoreProperties(value = { "applicationUsers", "categories", "expenses" }, allowSetters = true)
    private Company company;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ApplicationUser id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Role getRole() {
        return this.role;
    }

    public ApplicationUser role(Role role) {
        this.setRole(role);
        return this;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public User getInternalUser() {
        return this.internalUser;
    }

    public void setInternalUser(User user) {
        this.internalUser = user;
    }

    public ApplicationUser internalUser(User user) {
        this.setInternalUser(user);
        return this;
    }

    public Set<Expense> getExpenses() {
        return this.expenses;
    }

    public void setExpenses(Set<Expense> expenses) {
        if (this.expenses != null) {
            this.expenses.forEach(i -> i.setApplicationUser(null));
        }
        if (expenses != null) {
            expenses.forEach(i -> i.setApplicationUser(this));
        }
        this.expenses = expenses;
    }

    public ApplicationUser expenses(Set<Expense> expenses) {
        this.setExpenses(expenses);
        return this;
    }

    public ApplicationUser addExpense(Expense expense) {
        this.expenses.add(expense);
        expense.setApplicationUser(this);
        return this;
    }

    public ApplicationUser removeExpense(Expense expense) {
        this.expenses.remove(expense);
        expense.setApplicationUser(null);
        return this;
    }

    public ApplicationUser getApprover() {
        return this.approver;
    }

    public void setApprover(ApplicationUser applicationUser) {
        this.approver = applicationUser;
    }

    public ApplicationUser approver(ApplicationUser applicationUser) {
        this.setApprover(applicationUser);
        return this;
    }

    public Company getCompany() {
        return this.company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public ApplicationUser company(Company company) {
        this.setCompany(company);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ApplicationUser)) {
            return false;
        }
        return id != null && id.equals(((ApplicationUser) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ApplicationUser{" +
            "id=" + getId() +
            ", role='" + getRole() + "'" +
            "}";
    }
}
