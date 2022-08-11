const axios = require("axios");
const moment = require("moment");

RIGHT_ADDRESS_ONE = "bludenz 4911, lo barnechea";
RIGHT_ADDRESS_TWO = "monseñor eyzaguirre 612, ñuñoa";
RIGHT_DISTANCE = 17.556;
MULTIPLE_ANSWERS_ADDRESS = "parque";
NO_ANSWER_ADDRESS = "fake address with absolutely no results";

describe('api payloads', function() {
  it(' should return successful answers right', async () => {
    
    const response = await axios({
      url: "http://localhost:3001/distance-request",
      method: "POST",
      data: {
        origin: RIGHT_ADDRESS_ONE,
        destination: RIGHT_ADDRESS_TWO
      }
    });
    const {data} = response;
    
    expect(data.success).toBe(true);
    expect(data.result.distance).toBe(RIGHT_DISTANCE);
  });

  it(' should return error for multiple answers', async () => {
    
    const response = await axios({
      url: "http://localhost:3001/distance-request",
      method: "POST",
      data: {
        origin: RIGHT_ADDRESS_ONE,
        destination: MULTIPLE_ANSWERS_ADDRESS
      }
    });
    const {data} = response;
    
    expect(data.success).toBe(false);
    expect(data.errorMessages.destinationLength).toBeGreaterThanOrEqual(
      3
    );
  });

  it(' should return error for no answer', async () => {
    
    const response = await axios({
      url: "http://localhost:3001/distance-request",
      method: "POST",
      data: {
        origin: NO_ANSWER_ADDRESS,
        destination: MULTIPLE_ANSWERS_ADDRESS
      }
    });
    const {data} = response;
    
    expect(data.success).toBe(false);
    expect(data.errorMessages.originLength).toBe(
      0
    );
    expect(data.errorMessages.destinationLength).toBeGreaterThanOrEqual(
      3
    );
  });

  it(' should retrieve added entries correctly', async () => {
    await axios({
      url: "http://localhost:3001/distance-request",
      method: "POST",
      data: {
        origin: RIGHT_ADDRESS_ONE,
        destination: RIGHT_ADDRESS_TWO
      }
    });
    
    const response = await axios({
      url: "http://localhost:3001/entries",
      method: "GET"
    });
    const {data} = response;
    expect(data.length).toBeGreaterThanOrEqual(1);
    const lastAdded = data.shift();
    expect(lastAdded.origin).toBe(RIGHT_ADDRESS_ONE);
    expect(lastAdded.destination).toBe(RIGHT_ADDRESS_TWO);
    expect(lastAdded.distance).toBe(RIGHT_DISTANCE);
    expect(lastAdded.createdAt).toBeDefined();
    console.log(lastAdded);
    expect(
      moment().format('YYYY-MM-DD hh:mm:ss') > lastAdded.createdAt
    ).toBe(true);
  });

});