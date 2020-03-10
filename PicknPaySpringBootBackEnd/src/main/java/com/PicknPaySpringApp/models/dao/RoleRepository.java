package com.PicknPaySpringApp.models.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.PicknPaySpringApp.models.entity.Role;
import com.PicknPaySpringApp.models.entity.RoleName;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}