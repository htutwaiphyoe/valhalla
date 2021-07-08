const RoomFeatures = (props) => {
    const numberFeatures = [
        { caption: "Guests", value: props.guestCapacity, icon: "fa-users" },
        { caption: "Beds", value: props.numOfBeds, icon: "fa-bed" },
    ];

    const booleanFeatures = [
        { caption: "Breakfast", value: props.breakfast },
        { caption: "Air condition", value: props.airConditioned },
        { caption: "Internet", value: props.internet },
        { caption: "Room Cleaning", value: props.roomCleaning },
        { caption: "Pets Allowance", value: props.petsAllowed },
    ];
    return (
        <div className="features mt-5">
            <h3 className="mb-4">Features:</h3>
            {numberFeatures.map((f) => (
                <div className="room-feature" key={f.caption}>
                    <i className={"fa fa-cog fa-fw " + f.icon} aria-hidden="true"></i>
                    <p>
                        {f.value} {f.caption}
                    </p>
                </div>
            ))}

            {booleanFeatures.map((f) => (
                <div className="room-feature" key={f.caption}>
                    <i
                        className={f.value ? "fa fa-check text-success" : "fa fa-times text-danger"}
                        aria-hidden="true"
                    ></i>
                    <p>{f.caption}</p>
                </div>
            ))}
        </div>
    );
};

export default RoomFeatures;
