package fr.polytech.info4.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Course.
 */
@Entity
@Table(name = "course")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Course implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Min(value = 0)
    @Column(name = "prix", nullable = false)
    private Integer prix;

    @NotNull
    @Column(name = "distance", nullable = false)
    private Float distance;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @OneToOne
    @JoinColumn(unique = true)
    private Coursier coursier;

    @OneToMany(mappedBy = "course")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Commande> commandes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "courses", allowSetters = true)
    private Panier panier;

    @ManyToOne
    @JsonIgnoreProperties(value = "courses", allowSetters = true)
    private Coursier coursier;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPrix() {
        return prix;
    }

    public Course prix(Integer prix) {
        this.prix = prix;
        return this;
    }

    public void setPrix(Integer prix) {
        this.prix = prix;
    }

    public Float getDistance() {
        return distance;
    }

    public Course distance(Float distance) {
        this.distance = distance;
        return this;
    }

    public void setDistance(Float distance) {
        this.distance = distance;
    }

    public LocalDate getDate() {
        return date;
    }

    public Course date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Coursier getCoursier() {
        return coursier;
    }

    public Course coursier(Coursier coursier) {
        this.coursier = coursier;
        return this;
    }

    public void setCoursier(Coursier coursier) {
        this.coursier = coursier;
    }

    public Set<Commande> getCommandes() {
        return commandes;
    }

    public Course commandes(Set<Commande> commandes) {
        this.commandes = commandes;
        return this;
    }

    public Course addCommande(Commande commande) {
        this.commandes.add(commande);
        commande.setCourse(this);
        return this;
    }

    public Course removeCommande(Commande commande) {
        this.commandes.remove(commande);
        commande.setCourse(null);
        return this;
    }

    public void setCommandes(Set<Commande> commandes) {
        this.commandes = commandes;
    }

    public Panier getPanier() {
        return panier;
    }

    public Course panier(Panier panier) {
        this.panier = panier;
        return this;
    }

    public void setPanier(Panier panier) {
        this.panier = panier;
    }

    public Coursier getCoursier() {
        return coursier;
    }

    public Course coursier(Coursier coursier) {
        this.coursier = coursier;
        return this;
    }

    public void setCoursier(Coursier coursier) {
        this.coursier = coursier;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Course)) {
            return false;
        }
        return id != null && id.equals(((Course) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Course{" +
            "id=" + getId() +
            ", prix=" + getPrix() +
            ", distance=" + getDistance() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
