import { useState } from "react";
import { useRouter } from "next/router";

const Search = (props) => {
    const router = useRouter();
    const [location, setLocation] = useState("");
    const [guestCapacity, setguestCapacity] = useState("");
    const [category, setCategory] = useState("");

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (location.trim()) {
            router.push(
                `/?location=${location}&guestCapacity=${guestCapacity}&category=${category}`
            );
        }
    };
    return (
        <div className="container container-fluid">
            <div className="row wrapper">
                <div className="col-12 col-lg-5">
                    <form className="shadow-lg" onSubmit={formSubmitHandler}>
                        <h2 className="mb-3">Search Rooms</h2>
                        <div className="form-group">
                            <label htmlFor="location_field">Location</label>
                            <input
                                type="text"
                                className="form-control"
                                id="location_field"
                                placeholder="new york"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required={true}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="guest_field">No. of Guests</label>
                            <select
                                className="form-control"
                                id="guest_field"
                                value={guestCapacity}
                                onChange={(e) => setguestCapacity(e.target.value)}
                            >
                                <option value="">Choose guests</option>
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                    <option value={num} key={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="room_type_field">Room Type</label>
                            <select
                                className="form-control"
                                id="room_type_field"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Choose type</option>
                                {["King", "Single", "Twins"].map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn btn-block py-2">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Search;
