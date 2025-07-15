package br.com.fecaf.Controller;

import br.com.fecaf.Model.MarcaModel;
import br.com.fecaf.Repository.MarcaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/marcas")
public class MarcaController {

    @Autowired
    private MarcaRepository marcaRepository;

    @GetMapping
    public List<MarcaModel> listarMarcas() {
        return marcaRepository.findAll();
    }
}
