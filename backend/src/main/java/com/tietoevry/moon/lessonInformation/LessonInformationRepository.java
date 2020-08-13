package com.tietoevry.moon.lessonInformation;

import com.tietoevry.moon.lessonInformation.model.LessonInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonInformationRepository extends JpaRepository<LessonInformation, Long> {
}
