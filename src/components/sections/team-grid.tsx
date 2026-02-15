import Image from 'next/image'

interface TeamMember {
  name: string
  role: string
  image: string
  bio: string
}

const team: TeamMember[] = [
  {
    name: 'Noel Yaxley',
    role: 'Founder & Principal',
    image: '/images/shared/about-upscale.png',
    bio: 'Noel brings over 15 years of experience spanning both architecture and client-side project management. At FJMT, he contributed to projects such as the Charles Perkins Centre and UTS Central, building a strong understanding of laboratory and education environments. His later roles saw him manage complex, multi-stakeholder projects for Root Partnerships, Property NSW, and Sydney Water. With a reputation for calm leadership and technical rigour, Noel founded Upscale to deliver places that not only meet practical demands but enhance the environments and communities they serve.',
  },
]

export function TeamGrid() {
  return (
    <div className="mx-auto max-w-3xl">
      {team.map((member) => (
        <div key={member.name} className="flex flex-col items-center gap-8 md:flex-row md:items-start">
          <div className="relative h-80 w-64 shrink-0 overflow-hidden rounded-2xl md:w-56">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 256px, 224px"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {member.role}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {member.bio}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
