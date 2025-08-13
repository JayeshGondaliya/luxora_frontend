import React, { useState, useEffect, useMemo } from 'react';
import {
    Search,
    LayoutGrid,
    List,
    Filter,
    X,
    SlidersHorizontal
} from 'lucide-react';
import {
    Button,
    Input,
    Checkbox,
    Slider,
    Label,
    Sheet,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    SheetContent,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from './ui/customUi';
import axios from 'axios';
import SortDropdown from './SortDropdown'
import { useNavigate } from 'react-router-dom';
const categories = ['men', 'women', "kids"];
// const brands = ['Apple', 'Nike', 'Samsung', 'Adidas', 'Sony', 'Levis'];

const ProductCard = ({ product, layout }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/productsDetail/${product._id}/category/${product.category}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className={`cursor-pointer bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:bg-product-hover ${layout === 'list' ? 'flex items-center p-4' : 'p-4'
                }`}
        >
            <img
                src={product.image}
                alt={product.name}
                className={`object-cover rounded ${layout === 'list' ? 'w-24 h-24 mr-4' : 'w-full h-48'}`}
                loading="lazy"
            />
            <div className={layout === 'list' ? 'flex-1' : 'mt-3'}>
                <h3 className="font-semibold text-card-foreground line-clamp-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">
                    {product.category} • {product.brand}
                </p>
                <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-price-discount">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                        <span className="line-through text-price-original text-sm">
                            ₹{product.originalPrice.toLocaleString()}
                        </span>
                    )}
                </div>
                {product.ratings !== undefined && product.ratings !== null && (
                    <div className="flex items-center mt-2">
                        <span className="text-sm text-muted-foreground">★ {product.ratings.toFixed(0)}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const FilterSidebar = ({
    selectedBrands,
    priceRange,
    onCategoryChange,
    onBrandChange,
    onPriceRangeChange,
    onClearFilters,
    minratings,
    setMinratings,
    showInStockOnly,
    setShowInStockOnly,
    selectedCategories
}) => (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
                Clear All
            </Button>
        </div>

        {/* Price Range */}
        <div>
            <Label className="font-medium mb-3 block">Price Range</Label>
            <div className="px-2">
                <Slider
                    value={priceRange}
                    onValueChange={onPriceRangeChange}
                    max={100000}
                    min={0}
                    step={1000}
                    className="mb-3"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
            </div>
        </div>

        {/* Categories */}
        <div>
            <Label className="font-medium mb-3 block">Category</Label>
            <div className="space-y-3">
                {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) => onCategoryChange(category, checked)}
                        />
                        <Label htmlFor={`category-${category}`} className="text-sm font-normal">
                            {category}
                        </Label>
                    </div>
                ))}
            </div>
        </div>

        {/* Brands */}
        {/* <div>
            <Label className="font-medium mb-3 block">Brand</Label>
            <div className="space-y-3">
                {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                            id={`brand-${brand}`}
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={(checked) => onBrandChange(brand, checked)}
                        />
                        <Label htmlFor={`brand-${brand}`} className="text-sm font-normal">
                            {brand}
                        </Label>
                    </div>
                ))}
            </div>
            
        </div> */}
        <div>
            <Label className="font-medium mb-3 block">Ratings</Label>
            <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((r) => (
                    <div key={r} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            id={`ratings-${r}`}
                            name="ratings"
                            value={r}
                            checked={minratings === r}
                            onChange={() => setMinratings(r)}
                            className="form-radio text-primary"
                        />
                        <Label htmlFor={`ratings-${r}`} className="text-sm font-normal">
                            {r}★ & above
                        </Label>
                    </div>
                ))}
                <div className="flex items-center space-x-2">
                    <input
                        type="radio"
                        id="ratings-all"
                        name="ratings"
                        value=""
                        checked={minratings === null}
                        onChange={() => setMinratings(null)}
                        className="form-radio text-primary"
                    />
                    <Label htmlFor="ratings-all" className="text-sm font-normal">
                        All Ratings
                    </Label>
                </div>
            </div>
        </div>


        <div>
            <Label className="font-medium mb-3 block">Availability</Label>
            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="in-stock"
                        checked={showInStockOnly}
                        onCheckedChange={(checked) => setShowInStockOnly(!!checked)}
                    />
                    <Label htmlFor="in-stock" className="text-sm font-normal">
                        In Stock Only
                    </Label>
                </div>
            </div>
        </div>
    </div>

);

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [layout, setLayout] = useState('grid');
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [minratings, setMinratings] = useState(null);
    const [showInStockOnly, setShowInStockOnly] = useState(false);
    const URL = "https://luxora-backend-guh1.onrender.com";
    useEffect(() => {
        const getAllProduct = async () => {
            try {
                const res = await axios.get(`${URL}/api/product/getProductAll`, { withCredentials: true });
                setProducts(res.data.data);
            } catch (error) {
                console.log("get All product from product page", error);
            }
        };

        getAllProduct();
    }, []);
    // Uncomment this when you have your API ready
    // useEffect(() => {
    //   const fetchProducts = async () => {
    //     try {
    //       const res = await axios.get('http://localhost:8081/api/product/getProductAll');
    //       setProducts(res.data.data);
    //     } catch (err) {
    //       console.error('Failed to fetch products:', err);
    //     }
    //   };
    //   fetchProducts();
    // }, []);

    const handleCategoryChange = (category, checked) => {
        setSelectedCategories(prev =>
            checked ? [...prev, category] : prev.filter(c => c !== category)
        );
    };

    const handleBrandChange = (brand, checked) => {
        setSelectedBrands(prev =>
            checked ? [...prev, brand] : prev.filter(b => b !== brand)
        );
    };

    const handleClearFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setPriceRange([0, 100000]);
        setSearchTerm('');
        setSortOption('');
    };

    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Filter by price range
        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // Filter by selected categories
        if (selectedCategories.length > 0) {
            result = result.filter(p => selectedCategories.includes(p.category));
        }

        // Filter by selected brands
        if (selectedBrands.length > 0) {
            result = result.filter(p => selectedBrands.includes(p.brand));
        }

        // Search by name
        if (searchTerm) {
            result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        // ⭐️ Filter by ratings
        if (minratings !== null) {
            result = result.filter((p) => (p.ratings || 0) >= minratings);
        }

        // 📦 Filter In Stock Only
        if (showInStockOnly) {
            result = result.filter((p) => p.inStock);
        }

        // Sort
        if (sortOption === 'priceLowToHigh') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'priceHighToLow') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortOption === 'name') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        return result;
    }, [products, selectedCategories, selectedBrands, searchTerm, sortOption, priceRange, minratings, showInStockOnly]);

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <h1 className="text-2xl font-bold">Products</h1>

                        {/* Controls */}
                        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                            {/* Sort Dropdown */}
                            <SortDropdown value={sortOption} onChange={(val) => setSortOption(val)} />

                            {/* Layout Toggle (responsive) */}
                            <div className="flex border border-border rounded-md overflow-hidden">
                                <Button
                                    variant={layout === 'grid' ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setLayout('grid')}
                                    className="rounded-none"
                                >
                                    <LayoutGrid className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={layout === 'list' ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setLayout('list')}
                                    className="rounded-none border-l border-border"
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Desktop Sidebar */}
                    <aside className="hidden md:block w-full md:w-64 bg-filter-bg border border-border rounded-lg p-6 h-fit sticky top-6">
                        <FilterSidebar
                            selectedCategories={selectedCategories}
                            selectedBrands={selectedBrands}
                            priceRange={priceRange}
                            onCategoryChange={handleCategoryChange}
                            onBrandChange={handleBrandChange}
                            onPriceRangeChange={setPriceRange}
                            onClearFilters={handleClearFilters}
                            minratings={minratings}
                            setMinratings={setMinratings}
                            showInStockOnly={showInStockOnly}
                            setShowInStockOnly={setShowInStockOnly}
                        />
                    </aside>

                    {/* Products Section */}
                    <main className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-muted-foreground">
                                Showing {filteredProducts.length} of {products.length} products
                            </p>
                        </div>

                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">No products found matching your criteria.</p>
                                <Button variant="outline" onClick={handleClearFilters} className="mt-4">
                                    Clear Filters
                                </Button>
                            </div>
                        ) : (
                            <div
                                className={
                                    layout === 'grid'
                                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                                        : 'space-y-4'
                                }
                            >
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} layout={layout} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>

    );
};

export default ProductsPage;