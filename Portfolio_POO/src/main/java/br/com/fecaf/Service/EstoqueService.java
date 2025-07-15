package br.com.fecaf.Service;

import br.com.fecaf.Model.CarroModel;
import br.com.fecaf.Repository.EstoqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstoqueService {

    @Autowired
    private EstoqueRepository repository;

    public List<CarroModel> listarTodos() {
        return repository.findAll();
    }

    public Optional<CarroModel> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public CarroModel salvar(CarroModel carro) {
        return repository.save(carro);
    }

    public CarroModel atualizar(Long id, CarroModel carroAtualizado) {
        if (repository.existsById(id)) {
            carroAtualizado.setId(id);
            return repository.save(carroAtualizado);
        }
        return null;
    }

    public boolean deletar(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
