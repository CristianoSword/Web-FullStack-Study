package com.study.qa.repository;

import com.study.qa.model.StudentProfile;
import java.util.Optional;

public interface StudentProfileRepository {
    Optional<StudentProfile> findByEmail(String email);
}
