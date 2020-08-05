package com.tietoevry.moon.lesson;

import com.tietoevry.moon.lesson.model.Lesson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonService {
    @Autowired
    private LessonRepository lessonRepository;
    public List<Lesson> getAllLessons()
    {
        return lessonRepository.findAll();
    }
}
