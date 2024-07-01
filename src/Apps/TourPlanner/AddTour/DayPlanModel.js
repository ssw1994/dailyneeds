export class DayPlanModel {
  uuid;
  destination;
  fromDate;
  toDate;
  contactDetails;
  hotelDetails;
  location;
  constructor(
    tourDetails = null,
    contactPersonDetails = null,
    hotelDetails = null
  ) {
    this.uuid = Date.now();
    this.destination = tourDetails?.destination ?? "";
    this.fromDate = tourDetails?.fromDate ?? "";
    this.toDate = tourDetails?.fromDate ?? "";
    this.location = tourDetails?.location ?? {
      latitude: null,
      longitude: null,
    };
    this.contactDetails = {
      name: contactPersonDetails?.name ?? "",
      mobile: contactPersonDetails?.mobile ?? "",
      address: contactPersonDetails?.address ?? "",
      email: contactPersonDetails?.email ?? "",
    };
    this.hotelDetails = {
      name: hotelDetails?.name ?? "",
      address: hotelDetails?.address ?? "",
      location: hotelDetails?.location ?? {
        latitude: null,
        longitude: null,
      },
      number: hotelDetails?.number ?? "",
      email: hotelDetails?.email ?? "",
    };
  }
}
