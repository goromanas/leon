package com.tietoevry.moon.lessonInformation;

import com.tietoevry.moon.lessonInformation.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
}
