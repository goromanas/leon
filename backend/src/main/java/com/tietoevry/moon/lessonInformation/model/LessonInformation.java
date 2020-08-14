package com.tietoevry.moon.lessonInformation.model;

import com.tietoevry.moon.lesson.model.Lesson;
import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LessonInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date date;
    private String topic;
    private String information;
     @OneToMany
    private List<Assignment> assignment;
     @ManyToOne
     @JoinColumn(name = "LESSON_ID")
    private Lesson lesson;
}

