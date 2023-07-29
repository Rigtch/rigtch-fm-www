export default function Steps() {
  const steps = [
    'Click the green connect button',
    'Log in to your spotify account',
    'Enjoy all of our features!',
  ]

  return (
    <div className="flex flex-column gap-4 w-full">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-column align-items-center gap-3">
          <span className="text-xl text-center">{step}</span>

          {index !== 2 && (
            <i className="pi pi-arrow-down" style={{ fontSize: '2rem' }} />
          )}
        </div>
      ))}
    </div>
  )
}
