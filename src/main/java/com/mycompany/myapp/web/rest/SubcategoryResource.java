package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Subcategory;
import com.mycompany.myapp.repository.SubcategoryRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Subcategory}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SubcategoryResource {

    private final Logger log = LoggerFactory.getLogger(SubcategoryResource.class);

    private static final String ENTITY_NAME = "subcategory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubcategoryRepository subcategoryRepository;

    public SubcategoryResource(SubcategoryRepository subcategoryRepository) {
        this.subcategoryRepository = subcategoryRepository;
    }

    /**
     * {@code POST  /subcategories} : Create a new subcategory.
     *
     * @param subcategory the subcategory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new subcategory, or with status {@code 400 (Bad Request)} if the subcategory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/subcategories")
    public ResponseEntity<Subcategory> createSubcategory(@RequestBody Subcategory subcategory) throws URISyntaxException {
        log.debug("REST request to save Subcategory : {}", subcategory);
        if (subcategory.getId() != null) {
            throw new BadRequestAlertException("A new subcategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Subcategory result = subcategoryRepository.save(subcategory);
        return ResponseEntity
            .created(new URI("/api/subcategories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /subcategories/:id} : Updates an existing subcategory.
     *
     * @param id the id of the subcategory to save.
     * @param subcategory the subcategory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subcategory,
     * or with status {@code 400 (Bad Request)} if the subcategory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subcategory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/subcategories/{id}")
    public ResponseEntity<Subcategory> updateSubcategory(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Subcategory subcategory
    ) throws URISyntaxException {
        log.debug("REST request to update Subcategory : {}, {}", id, subcategory);
        if (subcategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, subcategory.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!subcategoryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Subcategory result = subcategoryRepository.save(subcategory);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subcategory.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /subcategories/:id} : Partial updates given fields of an existing subcategory, field will ignore if it is null
     *
     * @param id the id of the subcategory to save.
     * @param subcategory the subcategory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subcategory,
     * or with status {@code 400 (Bad Request)} if the subcategory is not valid,
     * or with status {@code 404 (Not Found)} if the subcategory is not found,
     * or with status {@code 500 (Internal Server Error)} if the subcategory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/subcategories/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Subcategory> partialUpdateSubcategory(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Subcategory subcategory
    ) throws URISyntaxException {
        log.debug("REST request to partial update Subcategory partially : {}, {}", id, subcategory);
        if (subcategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, subcategory.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!subcategoryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Subcategory> result = subcategoryRepository
            .findById(subcategory.getId())
            .map(existingSubcategory -> {
                if (subcategory.getName() != null) {
                    existingSubcategory.setName(subcategory.getName());
                }

                return existingSubcategory;
            })
            .map(subcategoryRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subcategory.getId().toString())
        );
    }

    /**
     * {@code GET  /subcategories} : get all the subcategories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subcategories in body.
     */
    @GetMapping("/subcategories")
    public List<Subcategory> getAllSubcategories() {
        log.debug("REST request to get all Subcategories");
        return subcategoryRepository.findAll();
    }

    /**
     * {@code GET  /subcategories/:id} : get the "id" subcategory.
     *
     * @param id the id of the subcategory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subcategory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/subcategories/{id}")
    public ResponseEntity<Subcategory> getSubcategory(@PathVariable Long id) {
        log.debug("REST request to get Subcategory : {}", id);
        Optional<Subcategory> subcategory = subcategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(subcategory);
    }

    /**
     * {@code DELETE  /subcategories/:id} : delete the "id" subcategory.
     *
     * @param id the id of the subcategory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/subcategories/{id}")
    public ResponseEntity<Void> deleteSubcategory(@PathVariable Long id) {
        log.debug("REST request to delete Subcategory : {}", id);
        subcategoryRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
