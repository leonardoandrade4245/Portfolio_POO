package br.com.fecaf.Controller;

import br.com.fecaf.Model.CarroModel;
import br.com.fecaf.Service.EstoqueService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/carros")
public class RestControll {

    @Autowired
    private EstoqueService service;

    @GetMapping
    public List<CarroModel> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<CarroModel> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public CarroModel adicionar(@RequestBody CarroModel carro) {
        return service.salvar(carro);
    }

    @PutMapping("/{id}")
    public CarroModel atualizar(@PathVariable Long id, @RequestBody CarroModel carro) {
        return service.atualizar(id, carro);
    }

    @DeleteMapping("/{id}")
    public String deletar(@PathVariable Long id) {
        return service.deletar(id) ? "Carro deletado com sucesso." : "Carro não encontrado.";
    }

    @PostConstruct
    public void init() {
        System.out.println("✅ EstoqueControl carregado!");
    }

    @PutMapping("/{id}/vender")
    public ResponseEntity<?> marcarComoVendido(@PathVariable Long id) {
        Optional<CarroModel> optional = service.buscarPorId(id);
        if (optional.isEmpty()) return ResponseEntity.notFound().build();

        CarroModel carro = optional.get();
        carro.setDisponibilidade(CarroModel.Disponibilidade.Vendido);
        service.salvar(carro); // reutiliza o salvar
        return ResponseEntity.ok().body("Carro marcado como vendido");
    }

}
