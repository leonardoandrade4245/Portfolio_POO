package br.com.fecaf.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.com.fecaf.Model.CarroModel;

@Repository
public interface EstoqueRepository extends JpaRepository<CarroModel, Long> {
}
