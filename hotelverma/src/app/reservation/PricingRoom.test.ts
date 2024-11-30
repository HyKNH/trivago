import { beforeEach, describe, it, expect,jest } from "@jest/globals"; // Jest's built-in testing functions
import {PricingRoom} from "./PricingRoom";


describe(PricingRoom, () => {
    let room: PricingRoom;

    beforeEach(() => {
        room = new PricingRoom("Hilton", 200);
       
    });

    it("should calculate total price including tax", () => {
        const saleTax = 0;
        const tax = room.calculateTotal(saleTax);
        const consoleSpy = jest.spyOn(console, 'log');
        expect(tax).toBe(0); // 200 * 0.12 = 24
        //expect(consoleSpy).toHaveBeenCalledWith("not valid tax")

    });

    it("should display the correct tax of room and total", () => {
        const saleTax = 0;
        room.calculateTotal(saleTax);
        const consoleSpy = jest.spyOn(console, 'log');
        room.displayTotal();
        expect(consoleSpy).toHaveBeenCalledWith("tax is not valid");
        //expect(consoleSpy).toHaveBeenCalledWith("Total: $224.00");
        consoleSpy.mockRestore();

    });
});