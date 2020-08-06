package com.tietoevry.moon.subject;

import com.tietoevry.moon.subject.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject,Long> {
}
