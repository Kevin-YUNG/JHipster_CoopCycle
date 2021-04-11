package fr.polytech.info4.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Commerce.
 */
@Entity
@Table(name = "commerce")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Commerce implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "adresse", nullable = false)
    private String adresse;

    @NotNull
    @Min(value = 0)
    @Max(value = 5)
    @Column(name = "note_commerce", nullable = false)
    private Integer noteCommerce;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "commerce")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Utilisateur> utilisateurs = new HashSet<>();

    @OneToMany(mappedBy = "commerce")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Produit> produits = new HashSet<>();

    @OneToMany(mappedBy = "commerce")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Commande> commandes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "commerce", allowSetters = true)
    private Panier panier;

    @ManyToMany(mappedBy = "commerce")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Produit> produits = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdresse() {
        return adresse;
    }

    public Commerce adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Integer getNoteCommerce() {
        return noteCommerce;
    }

    public Commerce noteCommerce(Integer noteCommerce) {
        this.noteCommerce = noteCommerce;
        return this;
    }

    public void setNoteCommerce(Integer noteCommerce) {
        this.noteCommerce = noteCommerce;
    }

    public String getName() {
        return name;
    }

    public Commerce name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Utilisateur> getUtilisateurs() {
        return utilisateurs;
    }

    public Commerce utilisateurs(Set<Utilisateur> utilisateurs) {
        this.utilisateurs = utilisateurs;
        return this;
    }

    public Commerce addUtilisateur(Utilisateur utilisateur) {
        this.utilisateurs.add(utilisateur);
        utilisateur.setCommerce(this);
        return this;
    }

    public Commerce removeUtilisateur(Utilisateur utilisateur) {
        this.utilisateurs.remove(utilisateur);
        utilisateur.setCommerce(null);
        return this;
    }

    public void setUtilisateurs(Set<Utilisateur> utilisateurs) {
        this.utilisateurs = utilisateurs;
    }

    public Set<Produit> getProduits() {
        return produits;
    }

    public Commerce produits(Set<Produit> produits) {
        this.produits = produits;
        return this;
    }

    public Commerce addProduit(Produit produit) {
        this.produits.add(produit);
        produit.setCommerce(this);
        return this;
    }

    public Commerce removeProduit(Produit produit) {
        this.produits.remove(produit);
        produit.setCommerce(null);
        return this;
    }

    public void setProduits(Set<Produit> produits) {
        this.produits = produits;
    }

    public Set<Commande> getCommandes() {
        return commandes;
    }

    public Commerce commandes(Set<Commande> commandes) {
        this.commandes = commandes;
        return this;
    }

    public Commerce addCommande(Commande commande) {
        this.commandes.add(commande);
        commande.setCommerce(this);
        return this;
    }

    public Commerce removeCommande(Commande commande) {
        this.commandes.remove(commande);
        commande.setCommerce(null);
        return this;
    }

    public void setCommandes(Set<Commande> commandes) {
        this.commandes = commandes;
    }

    public Panier getPanier() {
        return panier;
    }

    public Commerce panier(Panier panier) {
        this.panier = panier;
        return this;
    }

    public void setPanier(Panier panier) {
        this.panier = panier;
    }

    public Set<Produit> getProduits() {
        return produits;
    }

    public Commerce produits(Set<Produit> produits) {
        this.produits = produits;
        return this;
    }

    public Commerce addProduit(Produit produit) {
        this.produits.add(produit);
        produit.getCommerce().add(this);
        return this;
    }

    public Commerce removeProduit(Produit produit) {
        this.produits.remove(produit);
        produit.getCommerce().remove(this);
        return this;
    }

    public void setProduits(Set<Produit> produits) {
        this.produits = produits;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Commerce)) {
            return false;
        }
        return id != null && id.equals(((Commerce) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Commerce{" +
            "id=" + getId() +
            ", adresse='" + getAdresse() + "'" +
            ", noteCommerce=" + getNoteCommerce() +
            ", name='" + getName() + "'" +
            "}";
    }
}
