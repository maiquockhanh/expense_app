package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ApplicationUser;
import com.mycompany.myapp.domain.Company;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ApplicationUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApplicationUserRepository extends JpaRepository<ApplicationUser, Long> {
    @Query("SELECT u FROM ApplicationUser u WHERE u.company.id = ?1")
    List<ApplicationUser> findAllApplicationUsers(Long companyId);
}
