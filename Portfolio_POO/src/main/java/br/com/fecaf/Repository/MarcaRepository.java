package br.com.fecaf.Repository;

import br.com.fecaf.Model.MarcaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarcaRepository extends JpaRepository<MarcaModel, Integer> {
}

