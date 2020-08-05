package com.tietoevry.moon.classroom;

import com.tietoevry.moon.classroom.model.Classroom;
import com.tietoevry.moon.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface ClassroomRepository extends JpaRepository<Classroom,Long> {
}




