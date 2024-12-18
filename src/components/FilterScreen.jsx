import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FilterScreen = () => {
  const [category, setCategory] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [rating, setRating] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const categories = ['Electronics', 'Clothing', 'Home', 'Books', 'Beauty'];
  
  const handleCategorySelect = (category) => {
    setCategory(category);
    setModalVisible(false);
  };

  const applyFilters = () => {
    // Logic to apply filters, e.g., update the product list based on selected filters
    console.log(`Category: ${category}, Min Price: $${minPrice}, Max Price: $${maxPrice}, Rating: ${rating} stars`);
  };

  return (
    <View style={styles.container}>
      {/* Filter Button */}
      <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.filterText}>Filter</Text>
        <Icon name="filter" size={20} color="#fff" />
      </TouchableOpacity>

      {/* Filter Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filters</Text>
            
            {/* Category Filter */}
            <Text style={styles.filterLabel}>Category</Text>
            <FlatList
              data={categories}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleCategorySelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />

            {/* Price Range Filter */}
            <Text style={styles.filterLabel}>Price Range</Text>
            <Text>Min: ${minPrice} | Max: ${maxPrice}</Text>
            {/* Price Range Buttons */}
            <View style={styles.priceRangeButtons}>
              <TouchableOpacity style={styles.rangeButton} onPress={() => setMinPrice(minPrice - 10)}>
                <Text>-$10</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rangeButton} onPress={() => setMaxPrice(maxPrice + 10)}>
                <Text>+$10</Text>
              </TouchableOpacity>
            </View>

            {/* Rating Filter */}
            <Text style={styles.filterLabel}>Rating</Text>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                style={styles.starButton}
                onPress={() => setRating(star)}
              >
                <Text style={styles.starText}>{"★".repeat(star)}</Text>
              </TouchableOpacity>
            ))}
            
            {/* Apply Button */}
            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  filterText: {
    color: '#fff',
    marginRight: 10,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
  },
  priceRangeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  rangeButton: {
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 5,
  },
  starButton: {
    paddingVertical: 5,
    alignItems: 'center',
  },
  starText: {
    fontSize: 20,
    color: '#FFD700',
  },
  applyButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  applyButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default FilterScreen;
