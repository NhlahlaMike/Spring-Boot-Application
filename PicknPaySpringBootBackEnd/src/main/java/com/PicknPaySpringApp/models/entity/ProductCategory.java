package com.PicknPaySpringApp.models.entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

@Entity
public class ProductCategory implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name ="category_id")
	private Long id;
	@NotNull(message = "This field is mandatory")
	@Column(unique = true)
	private String name;
	@OneToMany(mappedBy = "productCategory", fetch=FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Product> products = new HashSet<Product>();
	
	public ProductCategory() {}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Set<Product> getProducts() {
		return products;
	}
	public void setProducts(Set<Product> products) {
		this.products = products;
	}
	
	private static final long serialVersionUID = 1L;
}
