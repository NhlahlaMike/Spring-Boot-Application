package com.PicknPaySpringApp.models.services;

import java.util.List;

import com.PicknPaySpringApp.models.entity.ProductCategory;

public interface IProductCategoryService {
	public ProductCategory save(ProductCategory productCategory);
	public List<ProductCategory> findAll();
	public ProductCategory findByName(String name);
}
