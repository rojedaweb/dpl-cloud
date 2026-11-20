export default async (req, context) => {
  try {
    const url = "https://api.open-meteo.com/v1/forecast"
      + "?latitude=28.1235&longitude=-15.4363"
      + "&current=temperature_2m,relative_humidity_2m,wind_speed_10m"
      + "&timezone=Atlantic%2FCanary";

    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error("Error al consultar Open-Meteo");
    }

    const datos = await respuesta.json();

    return Response.json({
      ciudad: "Las Palmas de Gran Canaria",
      temperatura: datos.current.temperature_2m,
      humedad: datos.current.relative_humidity_2m,
      viento: datos.current.wind_speed_10m,
      fecha: datos.current.time
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "No se pudo consultar el tiempo" },
      { status: 502 }
    );
  }
};