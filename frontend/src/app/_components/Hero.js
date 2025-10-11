import Image from 'next/image';

const services = [
  {
    title: 'Graphic Design',
    bgColor: 'bg-brand-blue-500',
    pattern: '/images/pattern-graphic-design.svg',
    textColor: 'text-neutral-0',
    gridClass: 'col-span-2 row-span-2',
  },
  {
    title: 'UI/UX',
    bgColor: 'bg-brand-yellow-500',
    pattern: '/images/pattern-ui-ux.svg',
    textColor: 'text-neutral-0',
    gridClass: 'col-span-1 row-span-1',
  },
  {
    title: 'Apps',
    bgColor: 'bg-brand-pink-500',
    pattern: '/images/pattern-apps.svg',
    textColor: 'text-neutral-0',
    gridClass: 'col-span-1 row-span-1',
  },
  {
    title: 'Photography',
    bgColor: 'bg-brand-cyan-500',
    pattern: '/images/pattern-photography.svg',
    textColor: 'text-neutral-0',
    gridClass: 'col-span-2 row-span-1',
  },
  {
    title: 'Illustrations',
    bgColor: 'bg-brand-red-500',
    pattern: '/images/pattern-illustrations.svg',
    textColor: 'text-neutral-0',
    gridClass: 'col-span-2 row-span-1',
  },
  {
    title: 'Motion Graphics',
    bgColor: 'bg-brand-purple-500',
    pattern: '/images/pattern-motion-graphics.svg',
    textColor: 'text-neutral-0',
    gridClass: 'col-span-2 row-span-1',
  },
];

export default function Hero() {
  return (
    <section className="py-400">
      {/* Hero Heading */}
      <div className="text-center mb-500 md:mb-800">
        <h1 className="text-1 md:text-1 text-neutral-900 mb-200 md:mb-300">
          Design solutions made easy
        </h1>
        <p className="text-4 text-neutral-400 mx-auto" style={{ maxWidth: '540px' }}>
          With over ten years of experience in various design disciplines, I'm your one-stop shop for your design needs.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-200 md:gap-300 auto-rows-fr">
        {services.map((service, index) => (
          <div
            key={index}
            className={`${service.bgColor} ${service.gridClass} rounded-8 md:rounded-16 p-300 flex flex-col justify-between items-start relative overflow-hidden hover:opacity-90 transition-opacity cursor-pointer ${service.gridClass.includes('col-span-1') ? 'aspect-square' : service.gridClass.includes('col-span-2') && !service.gridClass.includes('row-span-2') ? 'aspect-[2/1]' : ''}`}
            style={{ minHeight: '150px' }}
          >
            <div className={`absolute aspect-square ${service.gridClass.includes('col-span-2') && service.gridClass.includes('row-span-2') ? '-right-200 w-1/2 top-300' : service.gridClass.includes('col-span-2') && !service.gridClass.includes('row-span-2') ? 'right-300 w-1/3 -top-100' : 'right-300 w-1/2 top-300'}`}>
              <Image
                src={service.pattern}
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <h3 className={`text-3 ${service.textColor} relative z-10 mt-auto`}>
              {service.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}