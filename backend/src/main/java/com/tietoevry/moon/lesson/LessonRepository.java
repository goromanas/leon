package com.tietoevry.moon.lesson;

import com.tietoevry.moon.lesson.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonRepository extends JpaRepository<Lesson,Long> {
}
