package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Company.
 */
@Entity
@Table(name = "company")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Company implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "company_id")
    private String companyId;

    @OneToMany(mappedBy = "company")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "internalUser", "expenses", "approver", "company" }, allowSetters = true)
    private Set<ApplicationUser> applicationUsers = new HashSet<>();

    @OneToMany(mappedBy = "company")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "subcategories", "expense", "company" }, allowSetters = true)
    private Set<Category> categories = new HashSet<>();

    @OneToMany(mappedBy = "company")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "category", "company", "applicationUser" }, allowSetters = true)
    private Set<Expense> expenses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Company id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Company name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCompanyId() {
        return this.companyId;
    }

    public Company companyId(String companyId) {
        this.setCompanyId(companyId);
        return this;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public Set<ApplicationUser> getApplicationUsers() {
        return this.applicationUsers;
    }

    public void setApplicationUsers(Set<ApplicationUser> applicationUsers) {
        if (this.applicationUsers != null) {
            this.applicationUsers.forEach(i -> i.setCompany(null));
        }
        if (applicationUsers != null) {
            applicationUsers.forEach(i -> i.setCompany(this));
        }
        this.applicationUsers = applicationUsers;
    }

    public Company applicationUsers(Set<ApplicationUser> applicationUsers) {
        this.setApplicationUsers(applicationUsers);
        return this;
    }

    public Company addApplicationUser(ApplicationUser applicationUser) {
        this.applicationUsers.add(applicationUser);
        applicationUser.setCompany(this);
        return this;
    }

    public Company removeApplicationUser(ApplicationUser applicationUser) {
        this.applicationUsers.remove(applicationUser);
        applicationUser.setCompany(null);
        return this;
    }

    public Set<Category> getCategories() {
        return this.categories;
    }

    public void setCategories(Set<Category> categories) {
        if (this.categories != null) {
            this.categories.forEach(i -> i.setCompany(null));
        }
        if (categories != null) {
            categories.forEach(i -> i.setCompany(this));
        }
        this.categories = categories;
    }

    public Company categories(Set<Category> categories) {
        this.setCategories(categories);
        return this;
    }

    public Company addCategory(Category category) {
        this.categories.add(category);
        category.setCompany(this);
        return this;
    }

    public Company removeCategory(Category category) {
        this.categories.remove(category);
        category.setCompany(null);
        return this;
    }

    public Set<Expense> getExpenses() {
        return this.expenses;
    }

    public void setExpenses(Set<Expense> expenses) {
        if (this.expenses != null) {
            this.expenses.forEach(i -> i.setCompany(null));
        }
        if (expenses != null) {
            expenses.forEach(i -> i.setCompany(this));
        }
        this.expenses = expenses;
    }

    public Company expenses(Set<Expense> expenses) {
        this.setExpenses(expenses);
        return this;
    }

    public Company addExpense(Expense expense) {
        this.expenses.add(expense);
        expense.setCompany(this);
        return this;
    }

    public Company removeExpense(Expense expense) {
        this.expenses.remove(expense);
        expense.setCompany(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Company)) {
            return false;
        }
        return id != null && id.equals(((Company) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Company{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", companyId='" + getCompanyId() + "'" +
            "}";
    }
}
