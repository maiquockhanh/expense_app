package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Category.
 */
@Entity
@Table(name = "category")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "category")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "category" }, allowSetters = true)
    private Set<Subcategory> subcategories = new HashSet<>();

    @JsonIgnoreProperties(value = { "category", "company", "applicationUser" }, allowSetters = true)
    @OneToOne(mappedBy = "category")
    private Expense expense;

    @ManyToOne
    @JsonIgnoreProperties(value = { "applicationUsers", "categories", "expenses" }, allowSetters = true)
    private Company company;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Category id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Category name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Subcategory> getSubcategories() {
        return this.subcategories;
    }

    public void setSubcategories(Set<Subcategory> subcategories) {
        if (this.subcategories != null) {
            this.subcategories.forEach(i -> i.setCategory(null));
        }
        if (subcategories != null) {
            subcategories.forEach(i -> i.setCategory(this));
        }
        this.subcategories = subcategories;
    }

    public Category subcategories(Set<Subcategory> subcategories) {
        this.setSubcategories(subcategories);
        return this;
    }

    public Category addSubcategory(Subcategory subcategory) {
        this.subcategories.add(subcategory);
        subcategory.setCategory(this);
        return this;
    }

    public Category removeSubcategory(Subcategory subcategory) {
        this.subcategories.remove(subcategory);
        subcategory.setCategory(null);
        return this;
    }

    public Expense getExpense() {
        return this.expense;
    }

    public void setExpense(Expense expense) {
        if (this.expense != null) {
            this.expense.setCategory(null);
        }
        if (expense != null) {
            expense.setCategory(this);
        }
        this.expense = expense;
    }

    public Category expense(Expense expense) {
        this.setExpense(expense);
        return this;
    }

    public Company getCompany() {
        return this.company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Category company(Company company) {
        this.setCompany(company);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Category)) {
            return false;
        }
        return id != null && id.equals(((Category) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Category{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
