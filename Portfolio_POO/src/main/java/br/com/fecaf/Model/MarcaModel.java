package br.com.fecaf.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Entity
@Table(name = "marca")

public class MarcaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @OneToMany(mappedBy = "marca", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("marca")  // Impede loop, mas ainda serializa carros
    private List<CarroModel> carros;


    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<CarroModel> getCarros() {
        return carros;
    }

    public void setCarros(List<CarroModel> carros) {
        this.carros = carros;
    }
}
