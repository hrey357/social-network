export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('es-CO', {style: 'currency', currency: 'COP', maximumFractionDigits: 0}).format(amount)
}

export function formatDate(dateStr: string) : string {
    const dateObj = new Date(dateStr)
    const options : Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return new Intl.DateTimeFormat('es-ES', options).format(dateObj)
}

export function toBoolean(str: string) {
    return str.toLowerCase() === "true" 
}

export const getTimeBetweenDates = (startDate : string) => {
  const seconds = Math.floor((new Date().getTime() - new Date(startDate).getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  return getTextDuration( seconds, minutes, hours, days );
};

export const getTextDuration = ( seconds: number, minutes: number, hours: number, days: number ) => {
    let salida = 'Creado hace'

    if (days > 0) {
        salida += ` ${days} dias`
    } 
    else if (hours > 0) {
            salida += ` ${hours} horas`
        } 
        else if (minutes > 0) {
                salida += ` ${minutes} minutos`
            } 
            else {
                salida += ` ${seconds} segundos`                
            }
    return salida
}