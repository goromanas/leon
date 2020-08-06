package com.tietoevry.moon.lesson;

import com.tietoevry.moon.lesson.model.Lesson;
import com.tietoevry.moon.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LessonRepository extends JpaRepository<Lesson,Long> {
    List<Lesson> findAllByTeacher(Optional<User> teacher);
}
