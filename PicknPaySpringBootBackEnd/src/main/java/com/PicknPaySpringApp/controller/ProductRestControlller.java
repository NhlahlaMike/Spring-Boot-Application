package com.PicknPaySpringApp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.PicknPaySpringApp.models.entity.Product;
import com.PicknPaySpringApp.models.entity.ProductCategory;
import com.PicknPaySpringApp.models.services.IProductCategoryService;
import com.PicknPaySpringApp.models.services.IProductService;

@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("/api/products")
public class ProductRestControlller {

	@Autowired
	private IProductService productService;
	
	@Autowired
	private IProductCategoryService categoryService;
	
	@GetMapping("/getAllCategories")
	public List<ProductCategory> getAllCategories() {
		return categoryService.findAll();
	}
	
	@GetMapping("/getCategoriesByName/{name}") 
	public ResponseEntity<?> getCategoriesByName(@PathVariable String name) {
		
		String categoryName;
		Map<String, Object> response = new HashMap<>();
		
		try {
			categoryName = categoryService.findByName(name).getName();
		} catch(DataAccessException e) {
			response.put("message", "Error in querying database");
			response.put("Error", e.getMessage().concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);			
		}
		
		return new ResponseEntity<>(categoryName, HttpStatus.OK);			
	}
	
	@PostMapping("/createCategories")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> createCategories(@RequestBody ProductCategory productCategory) {
		
		ProductCategory newCategory = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			newCategory = categoryService.save(productCategory);
		} catch (DataIntegrityViolationException e) {
			response.put("message", "Error! category already exist.");
			response.put("Error", e.getMessage().concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		response.put("message", "The category has been created successfully!");
		response.put("category", newCategory);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

	@GetMapping("/getAllProducts")
	public List<Product> getAllProducts() {
		return productService.findAll();
	}

	@GetMapping("/getProductById/{id}")
	public ResponseEntity<?> getProductById(@PathVariable Long id) {
		
		Product product = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			product = productService.findById(id);
		} catch(DataAccessException e) {
			response.put("message", "Error in querying database");
			response.put("Error", e.getMessage().concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		if(product == null) {
			response.put("message", "Product ID: ".concat(id.toString().concat(" does not exist in the database")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Product>(product, HttpStatus.OK);
	}

	@PostMapping("/createProducts")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> createProducts(@RequestBody Product product) {
		
		Product newProduct = null;
		Map<String, Object> response = new HashMap<>();
		
		boolean isExistProduct = productService.existsByBarcode(product.getBarcode());
		
		if (isExistProduct) {
			
			response.put("message", "Product already Exist!");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		try {
			newProduct = productService.save(product);
		} catch (DataIntegrityViolationException e) {
			response.put("message", "Error! Product already exist.");
			response.put("Error", e.getMessage().concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		response.put("message", "The product has been created successfully!");
		response.put("product", newProduct);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

	@PutMapping("/editProduct/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> editProduct(@RequestBody Product product, @PathVariable Long id) {
		/*
		 Product productFromDB = productService.findById(id);  // or
		 Product productFromDB = productService.findById(product.getid());
		 */
		Product productFromDB = productService.findById(id);
		
		Product productUpdated = null;
		Map<String, Object> response = new HashMap<>();
		
		if(productFromDB == null) {
			response.put("message", "Error: could not be edited, Product ID: ".concat(id.toString().concat(" does not exist in the database")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		try {
			// productFromDB.setBarcode(product.getBarcode());  // value cannot be null or edited
			productFromDB.setProductName(product.getProductName());
			productFromDB.setProductDescription(product.getProductDescription());
			productFromDB.setImageUrl(product.getImageUrl());
			productFromDB.setProductType(product.getProductType());
			productFromDB.setPrice(product.getPrice());
			productFromDB.setQuantity(product.getQuantity());
			productFromDB.setFeatures(product.getFeatures());
			productFromDB.setProductUsage(product.getProductUsage());
			productFromDB.setOutOfStock(product.isOutOfStock());
			productFromDB.setBillingAddress(product.getBillingAddress());
			productFromDB.setTc(product.getTc());
			productFromDB.setSellerId(product.getSellerId());
			productFromDB.setSellerName(product.getSellerName());
			
			productUpdated = productService.save(productFromDB); 
		} catch (DataAccessException e) {
			response.put("message", "Error when updating Product to the database");
			response.put("Error", e.getMessage().concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("message", "The product has been updated successfully!");
		response.put("product", productUpdated);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

	@DeleteMapping("/deleteProduct/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
		
		Map<String, Object> response = new HashMap<>();
		
		try {
		productService.delete(id);
		} catch (DataAccessException e) {
			response.put("message", "Error when deleting Product in the database");
			response.put("Error", e.getMessage().concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.put("message", "Product with ID: ".concat(id.toString().concat(" has been deleted successfully")));
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}

}
