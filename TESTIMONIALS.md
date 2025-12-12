# Add Your Testimonial

We'd love to hear about your experience with bab! Share your story and it will be featured on [bab.sh](https://bab.sh).

## How to Submit

1. **Fork** this repository
2. **Edit** `data/testimonials.json`
3. **Add** your testimonial entry
4. **Create** a Pull Request

## Testimonial Format

Add your entry to the `data/testimonials.json` file:

```json
{
  "github": "your-github-username",
  "role": "Your Role or Title",
  "since": "YYYY-MM-DD",
  "quote": "Your testimonial about bab..."
}
```

### Fields

| Field    | Description                                                        | Example                                 |
| -------- | ------------------------------------------------------------------ | --------------------------------------- |
| `github` | Your GitHub username (used to fetch your profile picture and name) | `"octocat"`                             |
| `role`   | Your job title or role                                             | `"Software Engineer"`                   |
| `since`  | Date you started using bab                                         | `"2025-06-12"`                          |
| `quote`  | Your testimonial (keep it concise, 1-3 sentences)                  | `"bab simplified our build process..."` |

## Example

```json
[
  {
    "github": "octocat",
    "role": "Senior Developer",
    "since": "2025-01-15",
    "quote": "bab replaced our complex Makefile with a simple YAML config. The team adopted it instantly."
  }
]
```

## Guidelines

- Be authentic and share your genuine experience
- Keep your quote concise and focused
- Make sure your GitHub username is correct (we fetch your profile picture from it)
- Use the date format `YYYY-MM-DD` for the `since` field
