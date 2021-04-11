package fr.polytech.info4.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Coursier.
 */
@Entity
@Table(name = "coursier")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Coursier implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "firstname", nullable = false)
    private String firstname;

    @NotNull
    @Column(name = "lastname", nullable = false)
    private String lastname;

    @NotNull
    @Column(name = "mail", nullable = false)
    private String mail;

    @NotNull
    @Column(name = "phone", nullable = false)
    private String phone;

    @NotNull
    @Min(value = 1)
    @Max(value = 5)
    @Column(name = "reviews", nullable = false)
    private Integer reviews;

    @OneToMany(mappedBy = "coursier")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Course> courses = new HashSet<>();

    @OneToOne(mappedBy = "coursier")
    @JsonIgnore
    private Course course;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public Coursier firstname(String firstname) {
        this.firstname = firstname;
        return this;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public Coursier lastname(String lastname) {
        this.lastname = lastname;
        return this;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getMail() {
        return mail;
    }

    public Coursier mail(String mail) {
        this.mail = mail;
        return this;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPhone() {
        return phone;
    }

    public Coursier phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getReviews() {
        return reviews;
    }

    public Coursier reviews(Integer reviews) {
        this.reviews = reviews;
        return this;
    }

    public void setReviews(Integer reviews) {
        this.reviews = reviews;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    public Coursier courses(Set<Course> courses) {
        this.courses = courses;
        return this;
    }

    public Coursier addCourse(Course course) {
        this.courses.add(course);
        course.setCoursier(this);
        return this;
    }

    public Coursier removeCourse(Course course) {
        this.courses.remove(course);
        course.setCoursier(null);
        return this;
    }

    public void setCourses(Set<Course> courses) {
        this.courses = courses;
    }

    public Course getCourse() {
        return course;
    }

    public Coursier course(Course course) {
        this.course = course;
        return this;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Coursier)) {
            return false;
        }
        return id != null && id.equals(((Coursier) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Coursier{" +
            "id=" + getId() +
            ", firstname='" + getFirstname() + "'" +
            ", lastname='" + getLastname() + "'" +
            ", mail='" + getMail() + "'" +
            ", phone='" + getPhone() + "'" +
            ", reviews=" + getReviews() +
            "}";
    }
}
