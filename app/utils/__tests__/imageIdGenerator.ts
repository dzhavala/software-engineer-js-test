import { generateId } from "../imageIdGenerator"; // Replace "./exampleFile" with the path to your file

describe("generateId", () => {
  it("should generate an ID with a mocked date", () => {
    const mockDate = new Date("2022-01-01T12:00:00Z");
    const dateSpy = jest
      .spyOn(global, "Date")
      .mockImplementation(() => mockDate);
    const result = generateId();
    const expectedId = "image_details_20220101T120000000Z";

    expect(result).toContain(expectedId);
    dateSpy.mockRestore();
  });

  it("should generate an ID in the correct format", () => {
    const result = generateId();
    const regex = /^image_details_\d+[TZ]\d+/; // Regex pattern for IDs in the format image_details_<timestamp>
    expect(result).toMatch(regex);
  });

  it("should generate unique IDs for different invocations", () => {
    const id1 = generateId();
    const id2 = generateId();

    expect(id1).not.toEqual(id2);
  });
});
