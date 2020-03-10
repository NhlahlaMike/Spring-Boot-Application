package com.PicknPaySpringApp.models.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Product implements Serializable{

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 
    @NotNull(message = "This field is mandatory")
    @Column(unique = true)
    @Size(min=5,max= 5, message = "The Barcode must be atleast 5 characters")
    private String barcode;
    private String productName;
    @NotNull(message = "This field is mandatory")
    @Column(length = 150)
    private String productDescription;
	private String imageUrl;
    private String productType;
    @NotNull(message = "This field is mandatory")
    private int price;
    @NotNull(message = "This field is mandatory")
    private int quantity;
    private String features;
	private String productUsage;
	private boolean outOfStock;
	private String billingAddress;
	private String tc;
	private int sellerId;
	private String sellerName;
	
	public Product() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBarcode() {
		return barcode;
	}

	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductDescription() {
		return productDescription;
	}

	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getProductType() {
		return productType;
	}

	public void setProductType(String productType) {
		this.productType = productType;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getFeatures() {
		return features;
	}

	public void setFeatures(String features) {
		this.features = features;
	}

	public String getProductUsage() {
		return productUsage;
	}

	public void setProductUsage(String productUsage) {
		this.productUsage = productUsage;
	}

	public boolean isOutOfStock() {
		return outOfStock;
	}

	public void setOutOfStock(boolean outOfStock) {
		this.outOfStock = outOfStock;
	}

	public String getBillingAddress() {
		return billingAddress;
	}

	public void setBillingAddress(String billingAddress) {
		this.billingAddress = billingAddress;
	}

	public String getTc() {
		return tc;
	}

	public void setTc(String tc) {
		this.tc = tc;
	}

	public int getSellerId() {
		return sellerId;
	}

	public void setSellerId(int sellerId) {
		this.sellerId = sellerId;
	}

	public String getSellerName() {
		return sellerName;
	}

	public void setSellerName(String sellerName) {
		this.sellerName = sellerName;
	}
	
	private static final long serialVersionUID = 1L;
}
