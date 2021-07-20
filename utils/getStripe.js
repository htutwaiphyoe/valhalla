import { loadStripe } from "@stripe/stripe-js";

// let stripe;

const getStripe = async () => {
    const stripe = await loadStripe("pk_test_nsanZnV470i9Jd6CV2f8MmTd00JDT6S7NK");
    return stripe;
};

export default getStripe;
