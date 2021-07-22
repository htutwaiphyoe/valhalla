import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

import ButtonLoader from "../ButtonLoader/ButtonLoader";
import { updateRoomByAdmin, resetUpdateRoom, clearError } from "../../redux/actions/adminActions";

const UpdateRoom = (props) => {
    const { room, error: roomDetailsError } = useSelector((state) => state.roomDetails);

    const router = useRouter();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [pricePerNight, setPricePerNight] = useState(0);
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [category, setCategory] = useState("");
    const [guestCapacity, setGuestCapacity] = useState(1);
    const [numOfBeds, setNumOfBeds] = useState(1);
    const [internet, setInternet] = useState(false);
    const [breakfast, setBreakfast] = useState(false);
    const [airConditioned, setAirConditioned] = useState(false);
    const [petsAllowed, setPetsAllowed] = useState(false);
    const [roomCleaning, setRoomCleaning] = useState(false);
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const { loading, error, message } = useSelector((state) => state.updateRoom);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
        if (roomDetailsError) {
            toast.error(roomDetailsError);
            dispatch(clearError());
        }

        if (message) {
            toast.success(message);
            dispatch(resetUpdateRoom());
            router.push("/admin/rooms");
        }
    }, [dispatch, error, message, roomDetailsError]);
    useEffect(() => {
        if (room) {
            setName(room.name);
            setPricePerNight(room.pricePerNight);
            setDescription(room.description);
            setAddress(room.address);
            setCategory(room.category);
            setGuestCapacity(room.guestCapacity);
            setNumOfBeds(room.numOfBeds);
            setInternet(room.internet);
            setBreakfast(room.breakfast);
            setAirConditioned(room.airConditioned);
            setPetsAllowed(room.petsAllowed);
            setRoomCleaning(room.roomCleaning);
        }
        if (room.images) {
            const imageUrls = room.images.map((image) => image.url);
            setImagePreviews(imageUrls);
        }
    }, [room]);

    const submitHandler = (e) => {
        e.preventDefault();

        const roomData = {
            name,
            pricePerNight: +pricePerNight,
            description,
            address,
            category,
            guestCapacity: +guestCapacity,
            numOfBeds: +numOfBeds,
            internet,
            breakfast,
            airConditioned,
            petsAllowed,
            roomCleaning,
        };

        if (images.length !== 0) roomData.images = images;

        dispatch(updateRoomByAdmin(router.query.id, roomData));
    };

    const imagesChangeHandler = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagePreviews([]);

        files.forEach((file) => {
            const fileReader = new FileReader();

            fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                    setImages((state) => [...state, fileReader.result]);
                    setImagePreviews((state) => [...state, fileReader.result]);
                }
            };
            fileReader.readAsDataURL(file);
        });
    };
    return (
        <div className="container container-fluid">
            <div className="row wrapper">
                <div className="col-12 col-lg-8">
                    <form
                        className="shadow-lg"
                        encType="multipart/form-data"
                        onSubmit={submitHandler}
                    >
                        <h1 className="mb-4">Update Room</h1>
                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                value={name}
                                maxLength={100}
                                required={true}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price_field">Price Per Night</label>
                            <input
                                type="number"
                                id="price_field"
                                className="form-control"
                                value={pricePerNight}
                                required={true}
                                onChange={(e) => setPricePerNight(+e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description_field">Description</label>
                            <textarea
                                className="form-control"
                                id="description_field"
                                rows="8"
                                value={description}
                                maxLength={200}
                                required={true}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                maxLength={50}
                                value={address}
                                required={true}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category_field">Category</label>
                            <select
                                className="form-control"
                                id="category_field"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="King">King</option>
                                <option value="Single">Single</option>
                                <option value="Twins">Twins</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category_field">Guest Capacity</label>
                            <select
                                className="form-control"
                                id="guestCapacity_field"
                                value={guestCapacity}
                                onChange={(e) => setGuestCapacity(+e.target.value)}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category_field">Number of Beds</label>
                            <select
                                className="form-control"
                                id="numOfBeds_field"
                                value={numOfBeds}
                                onChange={(e) => setNumOfBeds(+e.target.value)}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <label className="mb-3">Room Features</label>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="internet_checkbox"
                                value={internet}
                                checked={internet}
                                onChange={(e) => setInternet(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="internet_checkbox">
                                Internet
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="breakfast_checkbox"
                                value={breakfast}
                                checked={breakfast}
                                onChange={(e) => setBreakfast(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="breakfast_checkbox">
                                Breakfast
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="airConditioned_checkbox"
                                value={airConditioned}
                                checked={airConditioned}
                                onChange={(e) => setAirConditioned(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="airConditioned_checkbox">
                                Air Conditioned
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="petsAllowed_checkbox"
                                value={petsAllowed}
                                checked={petsAllowed}
                                onChange={(e) => setPetsAllowed(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="petsAllowed_checkbox">
                                Pets Allowed
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="roomCleaning_checkbox"
                                value={roomCleaning}
                                checked={roomCleaning}
                                onChange={(e) => setRoomCleaning(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="roomCleaning_checkbox">
                                Room Cleaning
                            </label>
                        </div>
                        <div className="form-group mt-4">
                            <label>Images</label>
                            <div className="custom-file">
                                <input
                                    type="file"
                                    name="room_images"
                                    className="custom-file-input"
                                    id="customFile"
                                    onChange={imagesChangeHandler}
                                    multiple
                                    disabled={loading}
                                />
                                <label className="custom-file-label" htmlFor="customFile">
                                    {images.length > 0 ? "Images are chosen" : "Choose images"}
                                </label>
                            </div>

                            {imagePreviews.map((imagePreview, i) => (
                                <Image
                                    src={imagePreview}
                                    alt="Images Preview"
                                    className="mt-3 mr-2"
                                    width={55}
                                    height={52}
                                    key={i}
                                />
                            ))}
                        </div>
                        <button
                            type="submit"
                            className="btn btn-block new-room-btn py-3"
                            disabled={loading}
                        >
                            {loading ? <ButtonLoader /> : "UPDATE"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateRoom;
