package pl.edu.pw.bgtTracker.db.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.edu.pw.bgtTracker.db.entities.Comment;

public interface CommentsRepository extends JpaRepository<Comment, Long>{
  
}
