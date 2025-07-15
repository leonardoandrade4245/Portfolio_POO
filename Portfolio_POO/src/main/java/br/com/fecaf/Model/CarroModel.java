package br.com.fecaf.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "carro")
public class CarroModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private int ano;
    private String foto;

    @Enumerated(EnumType.STRING)
    private Classe classe;

    private String modelo;
    private double preco;

    private String cor;

    @Enumerated(EnumType.STRING)
    private Disponibilidade disponibilidade;

    @ManyToOne
    @JoinColumn(name = "marca_id", nullable = false)
    @JsonIgnoreProperties("carros")
    private MarcaModel marca;

    // Enum para Classe
    public enum Classe {
        hatch, sedan, picape, suv
    }

    // Enum para Disponibilidade
    public enum Disponibilidade {
        @Enumerated(EnumType.STRING)
        A_venda("A_venda"),
        Vendido("Vendido");

        private final String label;

        Disponibilidade(String label) {
            this.label = label;
        }

        public String getLabel() {
            return label;
        }
    }

    // Getters e Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }

    public void setNome(String nome) { this.nome = nome; }

    public int getAno() { return ano; }

    public void setAno(int ano) { this.ano = ano; }

    public Classe getClasse() { return classe; }

    public void setClasse(Classe classe) { this.classe = classe; }

    public String getModelo() { return modelo; }

    public void setModelo(String modelo) { this.modelo = modelo; }

    public double getPreco() { return preco; }

    public void setPreco(double preco) { this.preco = preco; }

    public MarcaModel getMarca() { return marca; }

    public void setMarca(MarcaModel marca) { this.marca = marca; }

    public String getFoto() { return foto; }

    public void setFoto(String foto) { this.foto = foto; }

    public String getCor() { return cor; }

    public void setCor(String cor) { this.cor = cor; }

    public Disponibilidade getDisponibilidade() { return disponibilidade; }

    public void setDisponibilidade(Disponibilidade disponibilidade) { this.disponibilidade = disponibilidade; }
}
